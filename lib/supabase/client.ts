// lib/supabase/client.ts - Local Database Client Adapter backed by lib/db.ts
import { db } from "@/lib/db";

class MockQueryBuilder {
  private table: string;
  private filters: Array<(item: any) => boolean> = [];
  private action: "select" | "insert" | "update" | "delete" = "select";
  private payload: any = null;

  constructor(table: string) {
    this.table = table;
  }

  select(columns = "*") {
    this.action = "select";
    return this;
  }

  insert(data: any) {
    this.action = "insert";
    this.payload = data;
    return this;
  }

  update(data: any) {
    this.action = "update";
    this.payload = data;
    return this;
  }

  delete() {
    this.action = "delete";
    return this;
  }

  eq(column: string, value: any) {
    this.filters.push((item: any) => item[column] === value);
    return this;
  }

  order(column: string, options?: any) {
    return this;
  }

  range(from: number, to: number) {
    return this;
  }

  private execute() {
    let dataset: any[] = [];
    if (this.table === "doctor_profiles") dataset = db.doctors.getAll();
    else if (this.table === "specialties") dataset = db.specialties.getAll();
    else if (this.table === "areas") dataset = db.areas.getAll();
    else if (this.table === "appointments") dataset = db.appointments.getAll();
    else if (this.table === "patient_profiles" || this.table === "users") dataset = db.users.getAll();
    else dataset = [];

    let results = dataset;
    for (const filter of this.filters) {
      results = results.filter(filter);
    }

    if (this.action === "insert") {
      return { data: this.payload, error: null };
    }
    if (this.action === "update") {
      const updated = results[0] ? { ...results[0], ...this.payload } : this.payload;
      return { data: updated, error: null };
    }
    if (this.action === "delete") {
      return { data: results[0] || null, error: null };
    }

    return { data: results, error: null };
  }

  async single(): Promise<{ data: any; error: any }> {
    const res = this.execute();
    const item = Array.isArray(res.data) ? res.data[0] || null : res.data;
    return { data: item, error: null };
  }

  then<TResult1 = any, TResult2 = never>(
    onfulfilled?: ((value: { data: any; error: any }) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null
  ): Promise<TResult1 | TResult2> {
    const res = this.execute();
    return Promise.resolve(res).then(onfulfilled, onrejected);
  }
}

export function createClient() {
  return {
    auth: {
      async signInWithPassword({ email, password }: { email: string; password: string }) {
        try {
          const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });
          const data = await res.json();
          if (!res.ok) {
            return { data: { user: null, session: null }, error: new Error(data.error || "Login failed") };
          }
          return { data: { user: data.user, session: data.user }, error: null };
        } catch (err: any) {
          return { data: { user: null, session: null }, error: new Error(err.message || "Network error") };
        }
      },

      async signUp({ email, password, options }: { email: string; password: string; options?: any }) {
        try {
          const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email,
              password,
              name: options?.data?.full_name || email.split("@")[0],
            }),
          });
          const data = await res.json();
          if (!res.ok) {
            return { data: { user: null, session: null }, error: new Error(data.error || "Sign up failed") };
          }
          return { data: { user: data.user, session: data.user }, error: null };
        } catch (err: any) {
          return { data: { user: null, session: null }, error: new Error(err.message || "Network error") };
        }
      },

      async signOut() {
        try {
          await fetch("/api/auth/logout", { method: "POST" });
          return { error: null };
        } catch (err: any) {
          return { error: new Error(err.message || "Logout failed") };
        }
      },

      async getUser() {
        try {
          const res = await fetch("/api/auth/me");
          const data = await res.json();
          return { data: { user: data.user }, error: null };
        } catch (err: any) {
          return { data: { user: null }, error: new Error(err.message) };
        }
      },

      async resetPasswordForEmail(email: string, options?: any) {
        return { data: {}, error: null };
      },

      async updateUser(attributes: any) {
        return { data: { user: attributes }, error: null };
      },

      async verifyOtp(params: any) {
        return { data: { session: null, user: null }, error: null };
      },
    },

    from(table: string) {
      return new MockQueryBuilder(table);
    },
  };
}
