import { initializeApp } from 'firebase-admin/app'
import { initializeFirestore } from 'firebase-admin/firestore'

/**
 * Initialize the admin app
 */
export const adminApp = initializeApp()

/**
 * Firebase application
 */
export const firestoreApp = initializeFirestore(adminApp)
