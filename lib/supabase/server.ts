// lib/supabase/server.ts - Local Database Server Adapter backed by lib/db.ts and cookies
import { cookies } from "next/headers";
import { db } from "@/lib/db";

class MockServerQueryBuilder {
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

export async function createClient() {
  const cookieStore = await cookies();
  const sessionStr = cookieStore.get("caredo_session")?.value || cookieStore.get("caredo_user")?.value;
  let currentUser: any = null;

  if (sessionStr) {
    try {
      const session = JSON.parse(sessionStr);
      const user = db.users.findById(session.id) || db.users.findByEmail(session.email);
      if (user) {
        currentUser = {
          id: user.id,
          email: user.email,
          user_metadata: {
            name: user.name,
            role: user.role,
          },
        };
      }
    } catch {
      // ignore
    }
  }

  return {
    auth: {
      async getUser() {
        if (!currentUser) {
          return { data: { user: null }, error: new Error("Not authenticated") };
        }
        return { data: { user: currentUser }, error: null };
      },

      async signOut() {
        cookieStore.delete("caredo_session");
        cookieStore.delete("caredo_user");
        return { error: null };
      },

      async verifyOtp(params: any) {
        return { data: { session: null, user: null }, error: null };
      },

      async resetPasswordForEmail(email: string, options?: any) {
        return { data: {}, error: null };
      },
    },

    from(table: string) {
      return new MockServerQueryBuilder(table);
    },
  };
}
