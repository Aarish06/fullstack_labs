import { Request, Response, NextFunction } from 'express';

export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  // Skip authentication for GET requests (viewing entries)
  if (req.method === 'GET') {
    return next();
  }

  // For POST requests, require authentication
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required. Please log in to perform this action.'
    });
  }

  // Basic token validation - in production you'd verify with Clerk
  const token = authHeader.substring(7);
  
  if (!token || token.length < 10) {
    return res.status(401).json({
      success: false,
      message: 'Invalid authentication token.'
    });
  }

  // For now, just check if token exists and has reasonable length
  // In production, you'd verify this token with Clerk's API
  next();
};
