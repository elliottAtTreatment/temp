import { firestoreApp } from './config/config.js'

/**
 *
 * @param srcDocRef
 * @param destDocRef
 */
async function copyDocument(srcDocRef: any, destDocRef: any): Promise<void> { // eslint-disable-line @typescript-eslint/no-explicit-any
  // Get the document data
  const docSnapshot = await srcDocRef.get()
  if (!docSnapshot.exists) {
    console.log('Document does not exist.')
    return
  }

  // Copy the document data
  await destDocRef.set(docSnapshot.data())

  // Get the subcollections
  const subcollections = await srcDocRef.listCollections()

  // Recursively copy each subcollection
  for (const subcollection of subcollections) {
    const subcollectionName = subcollection.id
    const srcSubcollectionRef = srcDocRef.collection(subcollectionName)
    const destSubcollectionRef = destDocRef.collection(subcollectionName)

    await copySubcollection(srcSubcollectionRef, destSubcollectionRef)
  }
}

/**
 *
 * @param srcSubcollectionRef
 * @param destSubcollectionRef
 */
async function copySubcollection(
  srcSubcollectionRef: any, // eslint-disable-line @typescript-eslint/no-explicit-any
  destSubcollectionRef: any, // eslint-disable-line @typescript-eslint/no-explicit-any
): Promise<void> {
  const snapshot = await srcSubcollectionRef.get()

  snapshot.forEach(async (doc: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
    const srcDocRef = srcSubcollectionRef.doc(doc.id)
    const destDocRef = destSubcollectionRef.doc(doc.id)
    await copyDocument(srcDocRef, destDocRef)
  })
}

/**
 *
 */
async function main() {
  const original = firestoreApp
    .collection('sdcos')
    .doc('decreased_vision@C4553853')
    .collection('versions')
    .doc('1.0')
    .collection('modifiers')
    .doc('visual_field_affected')

  const placeToCopyTo = firestoreApp
    .collection('ddos')
    .doc('alcoholic_intoxication@C0001969')
    .collection('versions')
    .doc('1.0')
    .collection('clinical_presentations')
    .doc('decreased_vision@C4553853')
    .collection('modifiers')
    .doc('visual_field_affected')

  await copyDocument(original, placeToCopyTo)
  console.log('Copy completed.')
}

main().catch(console.error)
