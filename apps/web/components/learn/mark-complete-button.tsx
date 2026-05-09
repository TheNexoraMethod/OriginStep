'use client'
import { useState } from 'react'
import { CheckCircle } from 'lucide-react'
import { getClient } from '@/lib/supabase/browser'
import { Button } from '@/components/ui/button'

interface MarkCompleteButtonProps {
  videoId: string
  userId: string
  initiallyCompleted: boolean
}

export function MarkCompleteButton({ videoId, userId, initiallyCompleted }: MarkCompleteButtonProps) {
  const [completed, setCompleted] = useState(initiallyCompleted)
  const [loading, setLoading] = useState(false)

  async function toggle() {
    setLoading(true)
    const supabase = getClient()

    if (completed) {
      await supabase
        .from('user_video_progress')
        .update({ completed: false, completion_percent: 0 })
        .eq('user_id', userId)
        .eq('video_id', videoId)
      setCompleted(false)
    } else {
      await supabase
        .from('user_video_progress')
        .upsert(
          { user_id: userId, video_id: videoId, completed: true, completion_percent: 100, watched_at: new Date().toISOString() },
          { onConflict: 'user_id,video_id' },
        )
      setCompleted(true)
    }
    setLoading(false)
  }

  return (
    <Button
      variant={completed ? 'secondary' : 'primary'}
      onClick={toggle}
      loading={loading}
      className="gap-2"
    >
      <CheckCircle size={16} className={completed ? 'text-status-success' : ''} />
      {completed ? 'Completed' : 'Mark as complete'}
    </Button>
  )
}
