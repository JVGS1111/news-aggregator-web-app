interface EmptyListMessageProps {
  text: string
}

export function EmptyListMessage({ text }: EmptyListMessageProps) {
  return (
    <div className="w-full text-center">
      <span className="text-slate-600">{text}</span>
    </div>
  )
}
