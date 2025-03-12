"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Mic, MicOff, Loader2 } from "lucide-react"

interface AudioRecorderProps {
  onAudioCaptured: (audioBlob: Blob) => void
  onTranscriptionComplete?: (text: string) => void
}

export function AudioRecorder({ onAudioCaptured, onTranscriptionComplete }: AudioRecorderProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isTranscribing, setIsTranscribing] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  const startRecording = async () => {
    audioChunksRef.current = []
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" })
        onAudioCaptured(audioBlob)

        if (onTranscriptionComplete) {
          setIsTranscribing(true)
          // Simulação de transcrição - em um app real, você enviaria para uma API
          setTimeout(() => {
            setIsTranscribing(false)
            onTranscriptionComplete("Esta é uma transcrição simulada da resposta gravada.")
          }, 2000)
        }

        // Parar todas as faixas de áudio
        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
      setRecordingTime(0)

      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
    } catch (error) {
      console.error("Erro ao acessar o microfone:", error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      setIsPaused(false)

      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }

  const togglePause = () => {
    if (mediaRecorderRef.current && isRecording) {
      if (isPaused) {
        mediaRecorderRef.current.resume()
        timerRef.current = setInterval(() => {
          setRecordingTime((prev) => prev + 1)
        }, 1000)
      } else {
        mediaRecorderRef.current.pause()
        if (timerRef.current) {
          clearInterval(timerRef.current)
        }
      }
      setIsPaused(!isPaused)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-4">
        {isRecording ? (
          <>
            <Button variant="destructive" size="icon" onClick={stopRecording} aria-label="Parar gravação">
              <MicOff className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              onClick={togglePause}
              aria-label={isPaused ? "Continuar gravação" : "Pausar gravação"}
            >
              {isPaused ? "Continuar" : "Pausar"}
            </Button>
            <div className="text-sm font-medium">{formatTime(recordingTime)}</div>
          </>
        ) : (
          <Button
            variant={isTranscribing ? "outline" : "default"}
            onClick={startRecording}
            disabled={isTranscribing}
            aria-label="Iniciar gravação"
          >
            {isTranscribing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Transcrevendo...
              </>
            ) : (
              <>
                <Mic className="mr-2 h-4 w-4" />
                Gravar Resposta
              </>
            )}
          </Button>
        )}
      </div>
      {isRecording && (
        <p className="text-xs text-muted-foreground">{isPaused ? "Gravação pausada" : "Gravando sua resposta..."}</p>
      )}
    </div>
  )
}

