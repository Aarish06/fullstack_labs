import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { employeeRepo } from '../repositories/employeeRepo';
import { employeeService } from '../services/employeeService';

export function useEmployees(page: number = 1, limit: number = 10) {
  return useQuery({
    queryKey: ['employees', page, limit],
    queryFn: () => employeeRepo.getEmployeesPaginated(page, limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useCreateEmployee() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (name: string) => employeeService.createEmployee(name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
  });
}

export function useDeleteEmployee() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => employeeService.deleteEmployee(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
  });
}
