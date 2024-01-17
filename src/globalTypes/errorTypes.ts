export interface IErrorEmailExists {
	error: Error
 }
 
 export interface Error {
	code: number
	message: string
	errors: Error2[]
 }
 
 export interface Error2 {
	message: string
	domain: string
	reason: string
 }