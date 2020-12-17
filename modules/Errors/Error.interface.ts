export default interface IError extends Error {
    message: string;
    statusCode: number;
    status: string;
    isOperational: boolean
}