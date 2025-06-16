'use client'

import {
    createDoctorProfile,
    deleteDoctorProfile,
    DoctorProfileInsert,
    fetchAllDoctorProfiles,
    updateDoctorProfile
} from '@/lib/apis/api'; // Update to correct path
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import {Loader2} from "lucide-react";

const emptyForm: DoctorProfileInsert = {
    user_id: '',
    full_name: '',
    area_id: 1,
    specialty_id: 1,
    phone: '',
    clinic_address: '',
    subscription_active: false
}

export default function DoctorProfilesManager() {
    const queryClient = useQueryClient()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [formData, setFormData] = useState<DoctorProfileInsert>(emptyForm)
    const [editing, setEditing] = useState(false)

    const { data, isLoading, error } = useQuery({
        queryKey: ['doctorProfiles'],
        queryFn: fetchAllDoctorProfiles
    })

    const createMutation = useMutation({
        mutationFn: createDoctorProfile,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['doctorProfiles'] })
            setIsModalOpen(false)
        },
        onError: (err) => {
            console.error('Create failed:', err)
        }
    })

    const updateMutation = useMutation({
        mutationFn: ({ user_id, updates }: { user_id: string; updates: Partial<DoctorProfileInsert> }) =>
            updateDoctorProfile(user_id, updates),
        onSuccess: () => {
            console.log("success")
            queryClient.invalidateQueries({ queryKey: ['doctorProfiles'] })
            setIsModalOpen(false)
        }
    })

    const deleteMutation = useMutation({
        mutationFn: deleteDoctorProfile,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['doctorProfiles'] })
    })

    const handleSubmit = () => {
        console.log('Submitting formData', formData)

        if (editing) {
            updateMutation.mutate({ user_id: formData.user_id, updates: formData })
        } else {
            const user_id = uuidv4()
            console.log('Creating with user_id:', user_id)
            createMutation.mutate({ ...formData, user_id })
        }
    }



    const openCreateModal = () => {
        setFormData({ ...emptyForm, user_id: '' })
        setEditing(false)
        setIsModalOpen(true)
    }

    const openEditModal = (profile: DoctorProfileInsert) => {
        setFormData(profile)
        setEditing(true)
        setIsModalOpen(true)
    }

    if (isLoading) return <div className="h-full w-full flex justify-center items-center">
        <Loader2 className="animate-spin h-6 w-6 text-neutral-500" />
    </div>


    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">Doctor Profiles</h1>
            <button onClick={openCreateModal} className="mb-4 bg-blue-600 text-white px-4 py-2 rounded">
                Create Doctor
            </button>

            {data?.length === 0?(
                <div className="text-center text-gray-500">
                    No doctor profiles found. Click "Create Doctor" to add a new profile.
                </div>
            ):
                data?.map((profile) => (
                <div
                    key={profile.user_id}
                    className="flex items-center justify-between border p-4 rounded mb-2"
                >
                    <div>
                        <div className="font-bold">{profile.full_name}</div>
                        <div className="text-sm text-gray-500">{profile.phone}</div>
                    </div>
                    <div className="space-x-2">
                        <button
                            onClick={() => openEditModal(profile)}
                            className="bg-yellow-500 text-white px-3 py-1 rounded"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => deleteMutation.mutate(profile.user_id)}
                            className="bg-red-600 text-white px-3 py-1 rounded"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-xl w-[400px] space-y-4">
                        <h2 className="text-xl font-bold">{editing ? 'Edit' : 'Create'} Doctor</h2>

                        <input
                            type="text"
                            placeholder="Full Name"
                            value={formData.full_name}
                            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                            className="w-full border px-3 py-2 rounded"
                        />
                        <input
                            type="text"
                            placeholder="Phone"
                            value={formData.phone || ''}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full border px-3 py-2 rounded"
                        />
                        <input
                            type="text"
                            placeholder="Clinic Address"
                            value={formData.clinic_address || ''}
                            onChange={(e) => setFormData({ ...formData, clinic_address: e.target.value })}
                            className="w-full border px-3 py-2 rounded"
                        />

                        <div className="flex items-center space-x-2">
                            <label className="text-sm">Subscription Active</label>
                            <input
                                type="checkbox"
                                checked={formData.subscription_active || false}
                                onChange={(e) => setFormData({ ...formData, subscription_active: e.target.checked })}
                            />
                        </div>

                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="bg-gray-300 px-4 py-2 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="bg-green-600 text-white px-4 py-2 rounded"
                            >
                                {editing ? 'Update' : 'Create'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
