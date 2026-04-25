import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './roleAuth';

export const authenticateUser = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
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

  // Mock user data for demonstration
  // In production, you'd verify this token with Clerk's API and get real user/role data
  if (token.includes('admin')) {
    req.user = {
      id: 'admin-user-id',
      roles: ['admin'],
      organizationId: 'org-123'
    };
  } else if (token.includes('moderator')) {
    req.user = {
      id: 'moderator-user-id',
      roles: ['moderator'],
      organizationId: 'org-123'
    };
  } else {
    req.user = {
      id: 'user-id',
      roles: ['user'],
      organizationId: 'org-123'
    };
  }

  next();
};
