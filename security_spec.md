# Security Specification - Student Registry System

## Data Invariants
1. **Student Integrity**: Every student must have a unique roll number (studentId field) and belong to a class.
2. **Temporal Truth**: `createdAt` is immutable. `updatedAt` must always reflect the server time of the last modification.
3. **Relational Consistency**: Activities must refer to a valid student document ID.
4. **Identity Ownership**: Only authenticated users can manage the registry (for this demo, we allow all signed-in users, but follow strict schema validation).

## The "Dirty Dozen" Payloads (Attack Vectors)

1. **Identity Spoofing**: Attempt to create a student with a future `createdAt` timestamp.
2. **Schema Poisoning**: Injecting an `isAdmin: true` field into a student document.
3. **Resource Exhaustion**: Sending a 1MB string as the student name.
4. **Orphaned Writes**: Creating an activity for a non-existent student ID.
5. **Update Gap**: Modifying the `createdAt` field on an existing student.
6. **Type Mismatch**: Sending `age` as a string instead of a number.
7. **Negative Values**: Setting a negative `score` for an activity.
8. **Invalid State**: Setting an attendance status other than 'present' or 'absent'.
9. **ID Poisoning**: Using a 2KB string as a document ID (if we were using custom IDs).
10. **Shadow Field**: Adding an `internalRating` field to a student document.
11. **Malicious ID**: Using script tags in the `studentId` (roll number) field.
12. **Bypass Verification**: Attempting a write from an unverified email account (when enforced).

## Test Runner (Logic Definitions)
The rules enforce these by:
- `isValidStudent` and `isValidActivity` helpers for schema and type safety.
- `affectedKeys().hasOnly()` gates on updates to prevent shadow fields.
- `exists()` checks for relational sync on activities.
- `request.time` comparison for temporal integrity.
- Email verification checks (as per security mandates).
