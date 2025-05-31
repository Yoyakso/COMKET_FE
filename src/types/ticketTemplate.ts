export interface TicketTemplate {
  id: string
  name: string
  purpose: string
  type: string
  color: string
  icon: string
  fields: TicketField[]
}

export interface TicketField {
  key: string
  label: string
  required: boolean
  defaultValue?: string
  placeholder?: string
  type: "text" | "textarea" | "date" | "select" | "user"
  options?: string[]
}
