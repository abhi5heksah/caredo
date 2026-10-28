"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, MessageSquarePlus, CheckCircle2 } from "lucide-react"

export default function FeedbackPage() {
    const [rating, setRating] = useState(5)
    const [email, setEmail] = useState("")
    const [feedbackType, setFeedbackType] = useState("Feature Suggestion")
    const [comments, setComments] = useState("")
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitted(true)
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <Card className="max-w-xl w-full rounded-3xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                <CardHeader className="p-6 sm:p-8 border-b border-gray-100 text-center space-y-2">
                    <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center mx-auto">
                        <MessageSquarePlus className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-900">Help Us Improve Caredo</CardTitle>
                    <p className="text-xs text-gray-500 max-w-sm mx-auto">
                        Your feedback shapes the future of healthcare access across India. Let us know how your experience was.
                    </p>
                </CardHeader>
                <CardContent className="p-6 sm:p-8">
                    {submitted ? (
                        <div className="text-center py-8 space-y-3">
                            <CheckCircle2 className="w-14 h-14 text-teal-600 mx-auto" />
                            <h3 className="text-xl font-bold text-gray-900">Thank You For Your Feedback!</h3>
                            <p className="text-xs text-gray-600 max-w-sm mx-auto">
                                We appreciate your time and suggestions. Our product and support team review every submission.
                            </p>
                            <Button
                                onClick={() => setSubmitted(false)}
                                variant="outline"
                                className="mt-4"
                            >
                                Submit More Feedback
                            </Button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Star Rating */}
                            <div className="text-center space-y-2">
                                <Label className="text-xs font-semibold text-gray-700">How would you rate your experience?</Label>
                                <div className="flex justify-center gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            type="button"
                                            key={star}
                                            onClick={() => setRating(star)}
                                            className="p-1 focus:outline-none transition-transform hover:scale-110"
                                        >
                                            <Star
                                                className={`w-8 h-8 ${
                                                    star <= rating
                                                        ? "text-amber-400 fill-amber-400"
                                                        : "text-gray-200"
                                                }`}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="fb-email" className="text-xs font-semibold text-gray-700">Your Email (Optional)</Label>
                                <Input
                                    id="fb-email"
                                    type="email"
                                    placeholder="e.g. rahul@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="rounded-xl"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="fb-type" className="text-xs font-semibold text-gray-700">Feedback Category</Label>
                                <select
                                    id="fb-type"
                                    value={feedbackType}
                                    onChange={(e) => setFeedbackType(e.target.value)}
                                    className="w-full h-10 px-3 border border-gray-200 rounded-xl bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                >
                                    <option value="Feature Suggestion">Feature Suggestion</option>
                                    <option value="Doctor Booking Issue">Doctor Booking Experience</option>
                                    <option value="Clinic Experience">Clinic / Receptionist Experience</option>
                                    <option value="Bug Report">Website Bug or Issue</option>
                                    <option value="Compliment">Compliment / Appreciation</option>
                                </select>
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="fb-comments" className="text-xs font-semibold text-gray-700">Your Thoughts *</Label>
                                <textarea
                                    id="fb-comments"
                                    required
                                    rows={4}
                                    placeholder="What went well? What can we do better?"
                                    value={comments}
                                    onChange={(e) => setComments(e.target.value)}
                                    className="w-full p-3 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-xl shadow-md"
                            >
                                Submit Feedback
                            </Button>
                        </form>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
