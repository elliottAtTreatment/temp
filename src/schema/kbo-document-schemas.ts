import { z } from 'zod'

/**
 *
 */
export const SdcoConfig = {
  sdcoDocumentType: 'http://treatment.com/standardized-diagnostic-concept-object',
  sdcoDocumentTypeName: 'sdco',
  sdcoDocumentTypeVersion: '3.2.0',
}

/**
 *
 */
export const DdoConfig = {
  ddoDocumentType: 'http://treatment.com/definition-of-diagnostic-object',
  ddoDocumentTypeName: 'ddo',
  ddoDocumentTypeVersion: '3.2.0',
}

/**
 * Knowledge Base Document Zod Object
 * This is a base class schema. Use .passthrough()
 */
export const KbDocumentSchema = z.object({
  document_type: z.string(),
  document_type_name: z.string(),
  document_type_version: z.string(),
  document_id: z.string(),
  version: z.string(),
  display_name: z.string(),
  description: z.string(),
  size: z.number(),
})
