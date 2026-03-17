import express from 'express';
import helmet from 'helmet';
import { corsMiddleware } from './middleware/cors';
import { validateContentType, validateRequestOrigin } from './middleware/validation';
import roleRoutes from './routes/roleRoutes';
import employeeRoutes from './routes/employeeRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());

// Custom CORS middleware
app.use(corsMiddleware);

// Request validation middleware
app.use(validateRequestOrigin);
app.use(validateContentType);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// API routes
app.use('/api/roles', roleRoutes);
app.use('/api/employees', employeeRoutes);

// Health check endpoint
app.get('/health', (req: express.Request, res: express.Response) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('*', (req: express.Request, res: express.Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Global error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Global error handler:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`👥 Roles API: http://localhost:${PORT}/api/roles`);
  console.log(`👤 Employees API: http://localhost:${PORT}/api/employees`);
});
