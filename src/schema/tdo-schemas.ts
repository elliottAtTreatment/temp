import { z } from 'zod'

/**
 *
 */
export const AlertItemSchema = z.object({
    alert_alert_cycletime: z.number().int().min(0),
    alert_alert_limit: z.number().int().min(0),
    alert_channel: z.string(),
    alert_date: z.object({
        seconds: z.number().int().min(0),
        nanoseconds: z.number().int().min(0),
    }),
    alert_expire_date: z.object({
        seconds: z.number().int().min(0),
        nanoseconds: z.number().int().min(0),
    }),
    alert_level: z.number().min(0),
    alert_response_required: z.string(),
    alert_triggers: z.array(z.string()),
})

/**
 *
 */
export type AlertItem = z.infer<typeof AlertItemSchema>

/**
 *
 */
export const PublicHealthAlertSchema = z.object({
    communicable_disease: z.boolean(),
    disease_prevention: z.array(z.string()),
})
/**
 *
 */
export type PublicHealthAlert = z.infer<typeof PublicHealthAlertSchema>

/**
 *
 */
export const RiskFactorSchema = z.record(z.object({
    risk_factor_importance: z.string(),
}))

/**
 *
 */
export type RiskFactor = z.infer<typeof RiskFactorSchema>

/**
 *
 */
export const ClinicalPresentationSchema = z.record(z.object({
    clinical_presentation_importance: z.string(),
}))

/**
 *
 */
export type ClinicalPresentation = z.infer<typeof ClinicalPresentationSchema>

/**
 *
 */
export const TreatmentTagsSchema = z.object({
    answer: z.string(),
    display_name: z.string(),
    display_name_layman: z.string(),
    question: z.string(),
    modifiers: z.any(), // TODO: figure out what this is. It has inconsistent structure. "Any" is not satisfactory
})

/**
 *
 */
export const CatalogItemSchema = z.object({
    display_name_layman: z.string(),
    name: z.string(),
    item_id: z.string(),
    treatments: z.object({
        dosage: z.string(),
        frequency: z.string(),
        root: z.string(),
    }),
})

/**
 *
 */
export const CatalogSchema = z.object({
    catalog_id: z.string(),
    display_name_layman: z.string(),
    purpose: z.string(),
    items: z.array(CatalogItemSchema),
    name: z.string(),
})

/**
 *
 */
export const SubTreatmentSchema = z.object({
    catalogs: z.array(CatalogSchema),
    category_id: z.string(),
    display_name_layman: z.string(),
    purpose: z.string(),
})

/**
 *
 */
export const BundleSchema = z.object({
    bundle_id: z.string(),
    display_name_layman: z.string(),
    title: z.string(),
    treatments: z.array(SubTreatmentSchema),
    description: z.string(),
})

/**
 *
 */
export const TreatmentSchema = z.object({
    bundle_id: z.string(),
    bundles: z.array(BundleSchema),
    description: z.string(),
    display_name_layman: z.string(),
    title: z.string(),
})

/**
 *
 */
export const TreatmentLevelSchema = z.object({
    display_name: z.string(),
    display_name_layman: z.string(),
    tags: z.array(TreatmentTagsSchema),
    treatments: z.record(TreatmentSchema),
    version: z.string(),
})

/**
 *
 */
export type TreatmentLevel = z.infer<typeof TreatmentLevelSchema>

/**
 *
 */
export const NotificationSchema = z.object({
    accompany: z.string(),
    need_reassessed: z.string(),
    notification_before_duration: z.string(),
    notification_before_type: z.string(),
    notification_type: z.string(),
    symptom: z.string(),
})

/**
 *
 */
export type Notification = z.infer<typeof NotificationSchema>

/**
 *
 */
export const UpdateSchema = z.object({
    authors: z.array(z.object({
        person_id: z.string(),
        role: z.string(),
    })),
    date: z.string(),
    comments: z.array(z.string()),
    version: z.string(),
})

/**
 *
 */
export type Update = z.infer<typeof UpdateSchema>

/**
 * This is the schema for a TDO in a simple object form (as it is in the firestore database)
 */
export const TDOSchema = z.object({
    tdo_id: z.string(),
    version: z.string(),
    last_update_time: z.string(),
    creation_time: z.string(),
    ddo_link: z.string(),
    display_name: z.string(),
    description: z.string(),
    alerts: z.array(AlertItemSchema),
    public_health_alerts: z.array(PublicHealthAlertSchema),
    regrets_threshold: z.number().nullable(),
    risk_factors_required: z.object({
        risk: RiskFactorSchema,
        history: RiskFactorSchema,
    }),
    minimum_clinical_presentation_list: z.object({
        symptoms: ClinicalPresentationSchema,
        tests: ClinicalPresentationSchema,
    }),
    treatment_levels: z.record(TreatmentLevelSchema),
    notifications: z.array(NotificationSchema),
    updates: z.array(UpdateSchema),
})

/**
 * TDO as a simple object type
 */
export type TdoAsSimpleObject = z.infer<typeof TDOSchema>
