import { z } from 'zod'

/**
 * Item Info zod object
 */
export const AuthorItemSchema = z.object({
  person_id: z.string(),
  role: z.string(),
})

/**
 * Author Item Type
 */
export type AuthorItem = z.infer<typeof AuthorItemSchema>

/**
 * Category Item zod object
 */
export const CategoryItemSchema = z.object({
  category: z.string(),
  values: z.array(z.string()),
})

/**
 * Category Item Type
 */
export type CategoryItem = z.infer<typeof CategoryItemSchema>

/**
 *
 * @param subcollectionRef
 */
export async function fireStoreCategoryItemSubcollectionToCategoryItemList(
  subcollectionRef: FirebaseFirestore.CollectionReference<
    FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData
  >,
): Promise<CategoryItem[]> {
  const subcollection = await subcollectionRef.get()
  if (subcollection.empty) return []

  return subcollection.docs.map((category) => {
    return {
      category: category.id,
      values: category.data().values,
    }
  })
}

/**
 * Catalog Reference Item zod object
 */
export const CatalogReferenceItemSchema = z.object({
  catalog_id: z.string(),
  version: z.string(),
  display_name: z.string(),
})

/**
 * Catalog Reference Item Type
 */
export type CatalogReferenceItem = z.infer<typeof CatalogReferenceItemSchema>

/**
 *
 * @param subcollectionRef
 */
// eslint-disable-next-line @stylistic/max-len
export async function fireStoreCatalogReferenceItemSubcollectionToCatalogReferenceItemList(
  subcollectionRef: FirebaseFirestore.CollectionReference<
    FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData
  >,
): Promise<CatalogReferenceItem[]> {
  const subcollection = await subcollectionRef.get()
  if (subcollection.empty) return []

  return subcollection.docs.map((category) => {
    return {
      catalog_id: category.id,
      version: category.data().version,
      display_name: category.data().display_name,
    }
  })
}

/**
 * Ddo Reference Item zod object
 */
export const DdoReferenceItemSchema = z.object({
  ddo_id: z.string(),
  version: z.string(),
  display_name: z.string(),
})

/**
 * Ddo Reference Item Type
 */
export type DdoReferenceItem = z.infer<typeof DdoReferenceItemSchema>

/**
 *
 * @param subcollectionRef
 */
// eslint-disable-next-line @stylistic/max-len
export async function fireStoreDdoReferenceItemSubcollectionToDdoReferenceItemList(
  subcollectionRef: FirebaseFirestore.CollectionReference<
    FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData
  >,
): Promise<DdoReferenceItem[]> {
  const subcollection = await subcollectionRef.get()
  if (subcollection.empty) return []

  return subcollection.docs.map((DdoReferenceItem) => {
    return {
      ddo_id: DdoReferenceItem.id,
      version: DdoReferenceItem.data().version,
      display_name: DdoReferenceItem.data().display_name,
    }
  })
}

/**
 * Demographic Prevalence Item zod object
 */
export const DemographicPrevalenceItemSchema = z.object({
  demographic: z.string(),
  prevalence: z.number(),
})

/**
 * Location Prevalence Item zod object
 */
export const LocationPrevalenceItemSchema = z.object({
  location: z.string(),
  multiplier: z.number(),
})

/**
 * Prevalence Description Item zod object
 */
export const PrevalenceDescriptionItemSchema = z.object({
  sources: z.array(z.string()),
  demographic_prevalence: z.array(DemographicPrevalenceItemSchema),
  location_prevalence: z.array(LocationPrevalenceItemSchema),
  comments: z.array(z.string()),
})

/**
 * Prevalence Description Item Type
 */
export type PrevalenceDescriptionItem
  = z.infer<typeof PrevalenceDescriptionItemSchema>

/**
 *
 * @param subcollectionRef
 */
// eslint-disable-next-line @stylistic/max-len
export async function fireStorePrevalenceDescriptionItemSubcollectionToPrevalenceDescriptionItem(
  subcollectionRef: FirebaseFirestore.CollectionReference<
    FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData
  >,
): Promise<PrevalenceDescriptionItem> {
  const subcollection = await subcollectionRef.get()
  if (subcollection.empty) {
    return {
      sources: [],
      demographic_prevalence: [],
      location_prevalence: [],
      comments: [],
    }
  }

  const demographic_prevalence_data = (await subcollectionRef.doc('demographic_prevalence').get()).data()
  const demographic_prevalence = (demographic_prevalence_data == undefined)
    ? []
    : (
      Object.entries(
        demographic_prevalence_data,
      ).map((keyValue) => {
        const [fieldName, prevalenceObject] = [keyValue[0], keyValue[1]]
        return {
          demographic: fieldName,
          prevalence: prevalenceObject['prevalence'],
        }
      })
    )

  const location_prevalence_data = (await subcollectionRef.doc('location_prevalence').get()).data()
  const location_prevalence = (location_prevalence_data == undefined)
    ? []
    : (
      Object.entries(
        location_prevalence_data,
      ).map((keyValue) => {
        const [fieldName, prevalenceObject] = [keyValue[0], keyValue[1]]
        return {
          location: fieldName,
          multiplier: prevalenceObject['multiplier'],
        }
      })
    )

  return {
    sources: [],
    demographic_prevalence: demographic_prevalence,
    location_prevalence: location_prevalence,
    comments: [],
  }
}
/**
 * Diagnostic Code Item zod object
 */
export const DiagnosticCodeItemSchema = z.object({
  coding_system: z.string(),
  version: z.string(),
  code: z.string(),
  display_name: z.string(),
})

/**
 * Diagnostic Code Item Type
 */
export type DiagnosticCodeItem = z.infer<typeof DiagnosticCodeItemSchema>

/**
 *
 * @param subcollectionRef
 */
// eslint-disable-next-line @stylistic/max-len
export async function fireStoreDiagnosticCodeItemSchemaSubcollectionToDiagnosticCodeItemSchemaList(
  subcollectionRef: FirebaseFirestore.CollectionReference<
    FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData
  >,
): Promise<DiagnosticCodeItem[]> {
  const subcollection = await subcollectionRef.get()
  if (subcollection.empty) return []

  return subcollection.docs.map((diagnosticCodeItemSchema) => {
    return {
      coding_system: diagnosticCodeItemSchema.data().coding_system,
      version: diagnosticCodeItemSchema.data().version,
      code: diagnosticCodeItemSchema.id,
      display_name: diagnosticCodeItemSchema.data().display_name,
    }
  })
}

/**
 * Identified Item zod object
 */
export const IdentifiedItemSchema = z.object({
  item_id: z.string(),
  display_name: z.string(),
  display_name_layman: z.string(),
  image_reference: z.string().nullish(),
  version: z.string().optional(),
})
/**
 * Measurement Description Item Zod Object
 */
export const MeasurementDescriptionItemSchema = z.object({
  units: z.string(),
  lower_bound: z.number().nullish(),
  upper_bound: z.number().nullish(),
})
/**
 * Measurement Description Item Type
 */
export type MeasurementDescriptionItem
  = z.infer<typeof MeasurementDescriptionItemSchema>

/**
 * Measurement Level Item Zod Object
 */
export const MeasurementLevelItemSchema = z.object({
  lower_bound: z.number(),
  upper_bound: z.number(),
})

/**
 * Risk Factor Item Zod Object. TODO: Finish Implementing
 */
export const RiskFactorItemSchema = IdentifiedItemSchema.extend({
  citations: z.array(z.string()),
  multiplier: z.number(),
})
/**
 * Risk Factor Item Type
 */
export type RiskFactorItem = z.infer<typeof RiskFactorItemSchema>

/**
 *
 * @param subcollectionRef
 */
export async function fireStoreRiskFactorItemSubcollectionToRiskFactorItemList(
  subcollectionRef: FirebaseFirestore.CollectionReference<
    FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData
  >,
): Promise<RiskFactorItem[]> {
  const subcollection = await subcollectionRef.get()
  if (subcollection.empty) return []

  const result: RiskFactorItem[] = []

  subcollection.docs.map((riskFactorCategory) => {
    for (const [key, value] of Object.entries(riskFactorCategory.data())) {
      if (typeof (value) == 'object') {
        result.push({
          item_id: key,
          display_name: value.display_name ?? '',
          display_name_layman: value.display_name_layman ?? '',
          image_reference: value.image_reference ?? '',
          version: value.version ?? '',
          citations: value.citations ?? [],
          multiplier: value.multiplier ?? 0,
        })
      }
    }
  })
  return result
}

/**
 * Update Item Zod Object
 */
export const UpdateItemSchema = z.object({
  date: z.string(),
  version: z.string(),
  kbe_version: z.string(),
  authors: z.array(AuthorItemSchema),
  comments: z.array(z.string()),
})
/**
 * Update Item Type
 */
export type UpdateItem = z.infer<typeof UpdateItemSchema>

/**
 *
 * @param subcollectionRef
 */
export async function fireStoreUpdateItemSubcollectionToUpdateItemList(
  subcollectionRef: FirebaseFirestore.CollectionReference<
    FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData
  >,
): Promise<UpdateItem[]> {
  const subcollection = await subcollectionRef.get()
  if (subcollection.empty) return []

  return subcollection.docs.map((updateItemSchema) => {
    return {
      date: updateItemSchema.data().date,
      version: updateItemSchema.data().version,
      kbe_version: updateItemSchema.data().kbe_version,
      authors: updateItemSchema.data().authors.map(
        (authorItem: Pick<AuthorItem, 'person_id' | 'role'>): AuthorItem => {
          return {
            person_id: authorItem.person_id,
            role: authorItem.role,
          }
        },
      ),
      comments: updateItemSchema.data().comments,
    }
  })
}

/* --------------- Tree/Branch Zod Object creation --------------- */
// Recursive Tree/branch zod objects//
const baseOfTreeSchema = IdentifiedItemSchema.extend({
  citations: z.array(z.string()).optional(),
})
const baseOfBranch = IdentifiedItemSchema.extend({
  sub_first_question: z.string().optional(),
  probability: z.number(),
  image_reference: z.string().nullish(),
  measurement_level: MeasurementLevelItemSchema.optional(),
  index: z.number().min(0),
})

/**
 * Recursive Branch Type
 */
export type Branch = z.infer<typeof baseOfBranch> & {
  modifiers?: Tree[]
  subBranches: Branch[]
}

/**
 *
 * @param documentRef
 * @param index
 */
export async function firebaseBranchToBranch(
  documentRef: FirebaseFirestore.QueryDocumentSnapshot<
    FirebaseFirestore.DocumentData,
    FirebaseFirestore.DocumentData
  >,
  index: number,
): Promise<Branch | undefined> {
  if (!documentRef.exists) return undefined

  return {
    item_id: documentRef.id,
    display_name: documentRef.data().display_name ?? '',
    display_name_layman: documentRef.data().display_name_layman ?? '',
    image_reference: documentRef.data().image_reference ?? null,
    version: documentRef.data().version,
    sub_first_question: documentRef.data().sub_first_question,
    probability: documentRef.data().probability,
    measurement_level: documentRef.data().measurement_level,
    index: index,
    modifiers: (
      await Promise.all((await documentRef.ref.collection('modifiers').get()).docs.map(
        doc => firestoreTreeToTree(doc),
      ))
    ).flatMap(removeNulls => (removeNulls != null) ? removeNulls : []),
    subBranches: (await Promise.all(
      (await documentRef.ref.collection('branches').get())
        .docs.map((doc, idx) => firebaseBranchToBranch(doc, idx)),
    )).flatMap(removeNulls => removeNulls ?? []),
  }
}

/**
 * Recursive Tree Type
 */
export type Tree = z.infer<typeof baseOfTreeSchema> & {
  modifiers?: Tree[]
  branches: Branch[]
}

/**
 *
 * @param documentRef
 */
export async function firestoreTreeToTree(
  documentRef: FirebaseFirestore.QueryDocumentSnapshot<
    FirebaseFirestore.DocumentData,
    FirebaseFirestore.DocumentData
  >,
): Promise<Tree | undefined> {
  if (!documentRef.exists) return undefined

  return {
    item_id: documentRef.id,
    display_name: documentRef.data().display_name ?? '',
    display_name_layman: documentRef.data().display_name_layman ?? '',
    image_reference: documentRef.data().image_reference ?? null,
    version: documentRef.data().version,
    citations: documentRef.data().citations,
    modifiers: (
      await Promise.all((await documentRef.ref.collection('modifiers').get()).docs.map(
        doc => firestoreTreeToTree(doc),
      ))
    ).flatMap(removeNulls => (removeNulls != null) ? removeNulls : []),
    branches: (await Promise.all((await documentRef.ref.collection('branches').get()).docs.map(
      (doc, idx) => firebaseBranchToBranch(doc, idx),
    ))).flatMap(removeNull => removeNull ?? []),
  }
}

/**
 *
 * @param subcollectionRef
 */
// eslint-disable-next-line @stylistic/max-len
export async function fireStoreClinicalPresentationSubcollectionToClinicalPresentation(
  subcollectionRef: FirebaseFirestore.CollectionReference<
    FirebaseFirestore.DocumentData, FirebaseFirestore.DocumentData
  >,
): Promise<Tree[]> {
  const subcollection = await subcollectionRef.get()
  if (subcollection.empty) return []

  return (await Promise.all(
    subcollection.docs.map(doc => firestoreTreeToTree(doc)),
  )).flatMap(removeNulls => (removeNulls != null) ? removeNulls : [])
}

/**
 * Recursive Branch zod object
 */
export const BranchSchema: z.ZodType<Branch> = baseOfBranch.extend({
  modifiers: z.lazy(() => z.array(TreeSchema)).optional(),
  subBranches: z.lazy(() => z.array(BranchSchema)),
})

/**
 * Recursive Tree zod object
 */
export const TreeSchema: z.ZodType<Tree> = baseOfTreeSchema.extend({
  modifiers: z.lazy(() => z.array(TreeSchema)).optional(),
  branches: z.lazy(() => z.array(BranchSchema)),
})

/**
 * base used to construct recursive Modifier branch zod object
 */
const baseOfModifierBranchSchema = IdentifiedItemSchema.extend({
  probability: z.number().min(0).max(1),
  index: z.number().min(0),
})

/**
 * Recursive Modifier Branch Type
 */
export type ModifierBranch = z.infer<typeof baseOfModifierBranchSchema> & {
  subBranches: ModifierBranch[]
}

/**
 * Recursive Modifier Branch zod object
 */
export const ModifierBranchSchema: z.ZodType<ModifierBranch>
  = baseOfModifierBranchSchema.extend({
    subBranches: z.lazy(() => z.array(ModifierBranchSchema)),
  })

/**
 * Non-recursive Modifier Tree zod object
 */
export const ModifierTreeSchema = IdentifiedItemSchema.extend({
  branches: z.array(ModifierBranchSchema),
})

// base used to construct recursive Lab Test branch zod object
const baseOfLabTestBranchSchema = IdentifiedItemSchema.extend({
  probability: z.number().min(0).max(1),
  measurement_level: MeasurementLevelItemSchema,
  index: z.number().min(0),
})

/**
 * Recursive Lab Test branch Type
 */
export type LabTestBranch = z.infer<typeof baseOfLabTestBranchSchema> & {
  subBranches: LabTestBranch[]
}

/**
 * Recursive Lab Test branch zod object
 */
export const LabTestBranchSchema: z.ZodType<LabTestBranch>
  = baseOfLabTestBranchSchema.extend({
    subBranches: z.lazy(() => z.array(LabTestBranchSchema)),
  })

/**
 * base used to construct recursive Symptom branch zod object
 */
const baseOfSymptomBranchSchema = IdentifiedItemSchema.extend({
  probability: z.number().min(0).max(1),
  index: z.number().min(0),
  modifiers: z.array(ModifierTreeSchema),
})

/**
 * Recursive Symptom branch Type
 */
export type SymptomBranch = z.infer<typeof baseOfSymptomBranchSchema> & {
  subBranches: SymptomBranch[]
}

/**
 * Recursive Symptom branch zod object
 */
export const SymptomBranchSchema: z.ZodType<SymptomBranch>
  = baseOfSymptomBranchSchema.extend({
    subBranches: z.lazy(() => z.array(SymptomBranchSchema)),
  })
