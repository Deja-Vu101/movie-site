export interface CreateRequestToken {
	success: boolean
	expires_at: string
	request_token: string
 }

 export interface CreateSession {
	success: boolean
	session_id: string
 }
 