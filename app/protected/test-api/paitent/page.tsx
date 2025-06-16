'use client'

import {
    createPatientProfile,
    deletePatientProfile,
    fetchPatientProfiles,
    PatientProfileInsert,
    updatePatientProfile
} from '@/lib/apis/api'; // update path as needed
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Empty patient form example — adapt fields as needed
const emptyForm: PatientProfileInsert = {
    user_id: '',
    full_name: '',
    phone: '',
    address: '',
    date_of_birth: '',  // example field
    subscription_active: false
}

export default function PatientProfilesManager() {
    const queryClient = useQueryClient()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [formData, setFormData] = useState<PatientProfileInsert>(emptyForm)
    const [editing, setEditing] = useState(false)

    const { data, isLoading, error } = useQuery({
        queryKey: ['patientProfiles'],
        queryFn: () => fetchPatientProfiles(),  // fetch all patient profiles
    })

    const createMutation = useMutation({
        mutationFn: createPatientProfile,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['patientProfiles'] })
            setIsModalOpen(false)
        },
        onError: (err) => {
            console.error('Create failed:', err)
        }
    })

    const updateMutation = useMutation({
        mutationFn: ({ user_id, updates }: { user_id: string; updates: Partial<PatientProfileInsert> }) =>
            updatePatientProfile(user_id, updates),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['patientProfiles'] })
            setIsModalOpen(false)
        },
        onError: (err) => {
            console.error('Update failed:', err)
        }
    })

    const deleteMutation = useMutation({
        mutationFn: deletePatientProfile,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['patientProfiles'] }),
        onError: (err) => {
            console.error('Delete failed:', err)
        }
    })

    const handleSubmit = () => {
        if (editing) {
            updateMutation.mutate({ user_id: formData.user_id, updates: formData })
        } else {
            const user_id = uuidv4()
            createMutation.mutate({ ...formData, user_id })
        }
    }

    const openCreateModal = () => {
        setFormData({ ...emptyForm, user_id: '' })
        setEditing(false)
        setIsModalOpen(true)
    }

    const openEditModal = (profile: PatientProfileInsert) => {
        setFormData(profile)
        setEditing(true)
        setIsModalOpen(true)
    }

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {(error as Error).message}</div>

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">Patient Profiles</h1>
            <button
                onClick={openCreateModal}
                className="mb-4 bg-blue-600 text-white px-4 py-2 rounded"
            >
                Create Patient
            </button>

            {data?.map((profile) => (
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
                        <h2 className="text-xl font-bold">{editing ? 'Edit' : 'Create'} Patient</h2>

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
                            placeholder="Address"
                            value={formData.address || ''}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            className="w-full border px-3 py-2 rounded"
                        />
                        {/* Add more inputs as per your patient profile schema */}

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
