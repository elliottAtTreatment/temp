import { z } from 'zod'
import {
  CategoryItemSchema,
  DdoReferenceItemSchema,
  PrevalenceDescriptionItemSchema,
  CatalogReferenceItemSchema,
  UpdateItemSchema,
  MeasurementDescriptionItemSchema,
  BranchSchema,
  ModifierTreeSchema,
  RiskFactorItemSchema,
  TreeSchema,
} from './kbo-common-schemas.js'
import { KbDocumentSchema } from './kbo-document-schemas.js'

/**
 *
 */
export const IdentifiedItemSchema = z.object({
  item_id: z.string(),
  display_name: z.string(),
  display_name_layman: z.string(),
  image_reference: z.optional(z.string()),
  version: z.optional(z.string()),
})

/**
 *
 */
export const DiagnosticCodeItemSchema = z.object({
  coding_system: z.string(),
  version: z.string(),
  code: z.string(),
  display_name: z.string(),
})

/**
 *
 */
export const RowSchemaBeforeRecursion = z.object({
  item_id: z.string(),
  id_list: z.array(z.string()),
  display_name_list: z.array(z.string()),
  display_name_list_layman: z.array(z.string()),
  image_reference_list: z.array(z.string()),
  probability: z.optional(z.number()),
  representsTerminalBranch: z.boolean(),
})

/**
 *
 */
export type Row = z.infer<typeof RowSchemaBeforeRecursion> & {
  modifiers?: Table[]
}

const RowSchema: z.ZodType<Row> = RowSchemaBeforeRecursion.extend({
  modifiers: z.lazy(() => TableSchema.array()).optional(),
})

const TableSchemaBeforeRecursion = IdentifiedItemSchema.extend({
  default_diagnostic_code: z.optional(DiagnosticCodeItemSchema),
  related_diagnostic_codes: z.optional(z.array(DiagnosticCodeItemSchema)),
  rows: z.array(RowSchema),
})

/**
 *
 */
export type Table = z.infer<typeof TableSchemaBeforeRecursion> & {
  modifiers?: Table[]
}

const TableSchema: z.ZodType<Table> = TableSchemaBeforeRecursion.extend({
  modifiers: z.lazy(() => TableSchema.array()).optional(),
})

/**
 *
 */
export const SdcoAsSimpleObjectSchema = KbDocumentSchema.extend({
  branches: z.array(BranchSchema),
  catalogs: z.array(CatalogReferenceItemSchema),
  categories: z.array(CategoryItemSchema),
  citations: z.array(z.string()),
  default_diagnostic_code: DiagnosticCodeItemSchema,
  definition: z.string(),
  definition_layman: z.string(),
  display_name_layman: z.string(),
  measurement_range: z.optional(MeasurementDescriptionItemSchema),
  modifiers: z.array(ModifierTreeSchema),
  prevalence: PrevalenceDescriptionItemSchema,
  related_diagnostic_codes: z.array(DiagnosticCodeItemSchema),
  sdco_id: z.string(),
  updates: z.array(UpdateItemSchema),
})

/**
 *
 */
export type SdcoAsSimpleObject = z.infer<typeof SdcoAsSimpleObjectSchema>

/**
 *
 */
export const DdoPartialHeaderSchema = KbDocumentSchema.extend({
  ddo_id: z.string(),
  definition: z.string(),
  display_name_layman: z.string(),
  categories: z.array(CategoryItemSchema),
  complications: z.array(DdoReferenceItemSchema),
  risk_factors: z.array(RiskFactorItemSchema),
})

/**
 *
 */
export const DdoSchema = DdoPartialHeaderSchema.extend({
  catalogs: z.array(CatalogReferenceItemSchema),
  sdco_document_type_version: z.string(),
  definition_layman: z.string(),
  updates: z.array(UpdateItemSchema),
  default_diagnostic_code: DiagnosticCodeItemSchema,
  related_diagnostic_codes: z.array(DiagnosticCodeItemSchema),
  clinicalPearls: z.array(z.string()),
  clinical_presentations: z.array(TreeSchema),
  prevalence: PrevalenceDescriptionItemSchema,
  recommended_symptom_sdcos_for_future_ddo_updates: z.array(z.string()),
  recommended_labtest_sdcos_for_future_ddo_updates: z.array(z.string()),
})

/**
 *
 */
export type Ddo = z.infer<typeof DdoSchema>
