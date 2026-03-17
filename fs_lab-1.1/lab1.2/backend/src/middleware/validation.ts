import { Request, Response, NextFunction } from 'express';

export const validateContentType = (req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    const contentType = req.headers['content-type'];
    
    if (!contentType || !contentType.includes('application/json')) {
      return res.status(400).json({
        success: false,
        message: 'Content-Type must be application/json'
      });
    }
  }
  
  next();
};

export const validateRequestOrigin = (req: Request, res: Response, next: NextFunction) => {
  const userAgent = req.headers['user-agent'];
  const origin = req.headers.origin;
  const referer = req.headers.referer;
  
  // Allow requests from browser origins and common development tools
  const allowedUserAgents = [
    'mozilla',
    'chrome',
    'safari',
    'firefox',
    'edge',
    'postman',
    'insomnia'
  ];
  
  const isBrowserRequest = allowedUserAgents.some(ua => 
    userAgent && userAgent.toLowerCase().includes(ua)
  );
  
  const isAllowedOrigin = origin && (
    origin.includes('localhost') || 
    origin.includes('127.0.0.1')
  );
  
  const isAllowedReferer = referer && (
    referer.includes('localhost') || 
    referer.includes('127.0.0.1')
  );
  
  if (isBrowserRequest || isAllowedOrigin || isAllowedReferer) {
    return next();
  }
  
  res.status(403).json({
    success: false,
    message: 'Access denied'
  });
};
