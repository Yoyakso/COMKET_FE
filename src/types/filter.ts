import {PRIORITY, STATUS, TYPE} from '@/constants/filterData';

export type Priority = typeof PRIORITY[number];
export type Status = typeof STATUS[number];
export type TicketType = typeof TYPE[number];