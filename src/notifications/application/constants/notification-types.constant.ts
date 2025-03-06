import { NotificationTypeEnum } from "src/notifications/domain/enums/notification-type.enum";

export const NOTIFICATION_TYPES = {
    [NotificationTypeEnum.SYSTEM]: {
        icon: 'https://cdn.exirtu.be/linchpin/notif_type_system.png',
        color: '#8543FF',
    },
    [NotificationTypeEnum.PAYROLL]: {
        icon: 'https://cdn.exirtu.be/linchpin/notif_type_payroll.png',
        color: '#3DBE68',
    },
    [NotificationTypeEnum.REPORT]: {
        icon: 'https://cdn.exirtu.be/linchpin/notif_type_report.png',
        color: '#4395FF',
    },
    [NotificationTypeEnum.REQUEST]: {
        icon: 'https://cdn.exirtu.be/linchpin/notif_type_request.png',
        color: '#F77567',
    },
    [NotificationTypeEnum.TASK]: {
        icon: 'https://cdn.exirtu.be/linchpin/notif_type_task.png',
        color: '#F3A540',
    },

}