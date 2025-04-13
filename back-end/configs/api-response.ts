export class ApiResponse {
  static success(message: string, data?: any) {
    return {
      success: true,
      message,
      data,
    };
  }

  static error(message: string) {
    return {
      success: false,
      message,
    };
  }

  static notFound(message: string) {
    return {
      success: false,
      message,
    };
  }

  static validationError(message: any) {
    return {
      success: false,
      message,
    };
  }
}
