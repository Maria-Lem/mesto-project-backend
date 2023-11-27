export enum Action {
  LIKE = 'like',
  DISLIKE = 'dislike',
}

export enum StatusCodes {
  BAD_REQUEST_ERR = 400,
  UNAUTHORIZED_ERR = 401,
  FORBIDDEN_ERR = 403,
  NOT_FOUND_ERR = 404,
  CONFLICT_ERR = 409,
  INTERNAL_SERVER_ERR = 500,
}
