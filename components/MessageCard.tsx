"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "../components/ui/alert-dialog"

import { Button } from "./ui/button"
import { X } from "lucide-react"
import { toast } from "sonner"
import axios, { AxiosError } from "axios"
import { ApiResponse } from "@/types/ApiResponse"

import { Message } from "@/model/User"

type MessageCardProps = {
  message: Message
  onMessageDelete: (messageId: string) => void
}

const MessageCard = ({
  message,
  onMessageDelete,
}: MessageCardProps) => {

  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete<ApiResponse>(
        `/api/delete-message/${message._id}`
      )

      toast.success(response.data.message)

      // remove from UI
      onMessageDelete(message._id.toString())

    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      const errorMessage = axiosError.response?.data.message

      toast.error(errorMessage || "Failed to delete message")
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{message.content}</CardTitle>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="icon">
              <X className="w-5 h-5" />
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteConfirm}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

      </CardHeader>

      <CardContent />
    </Card>
  )
}

export default MessageCard