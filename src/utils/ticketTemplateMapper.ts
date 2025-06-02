import type { TicketTemplate } from "@/types/ticketTemplate"
import type { CreateTicketDto } from "@/api/Ticket"

export const mapTemplateToCreateTicketDto = (
  template: TicketTemplate,
  fieldValues: Record<string, any>,
  assigneeMemberId: number,
): CreateTicketDto => {
  const base: CreateTicketDto = {
    ticket_name: fieldValues.title || template.name,
    ticket_type: template.name,
    ticket_priority: fieldValues.priority,
    ticket_state: fieldValues.ticketState || "TODO",
    description: fieldValues.content || template.purpose,
    start_date: fieldValues.start_date,
    end_date: fieldValues.end_date ?? null,
    assignee_member_id: assigneeMemberId,
    parent_ticket_id: fieldValues.parentTicketId || null,
    additional_info: getAdditionalInfo(template.id, fieldValues),
  }

  return base
}

const getAdditionalInfo = (templateId: string, values: Record<string, any>) => {
  switch (templateId) {
    case "feature-development":
      return {
        expected_result: values.expectedResult,
      }
    case "planning-proposal":
      return {
        proposal_content: values.proposalContent,
      }
    case "qa-test":
      return {
        test_scenario: values.testScenario,
        expected_result: values.expectedResult,
      }
    case "bug-report":
      return {
        reproduction_steps: values.reproductionSteps,
        expected_vs_actual: values.expectedVsActual,
        environment_info: values.environment,
      }
    case "data-analysis":
      return {
        required_data: values.dataItems,
        analysis_result_link: values.resultLink,
      }
    case "meeting-scrum":
      return null
    case "basic":
    default:
      return null
  }
}
