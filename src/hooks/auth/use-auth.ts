"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
}

interface LoginCredentials {
  username: string;
  password: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

// Mock user data
const MOCK_USER: User = {
  id: "1",
  name: "أحمد محمد العلوي",
  email: "ahmed.alawi@shrine.gov.iq",
  role: "مدير النظام",
  department: "إدارة التسكين",
};

// Mock credentials
const MOCK_CREDENTIALS = {
  username: "admin",
  password: "123456",
};

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null,
  });
  const router = useRouter();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    try {
      const token = getCookie("authToken");
      if (token) {
        // In a real app, you would validate the token with your backend
        setAuthState({
          user: MOCK_USER,
          isLoading: false,
          error: null,
        });
      } else {
        setAuthState({
          user: null,
          isLoading: false,
          error: null,
        });
      }
    } catch (error) {
      setAuthState({
        user: null,
        isLoading: false,
        error: "حدث خطأ في التحقق من صحة تسجيل الدخول",
      });
    }
  };

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock authentication
      if (
        credentials.username === MOCK_CREDENTIALS.username &&
        credentials.password === MOCK_CREDENTIALS.password
      ) {
        // Set cookie
        setCookie("authToken", "mock-jwt-token", 7); // 7 days
        
        setAuthState({
          user: MOCK_USER,
          isLoading: false,
          error: null,
        });

        router.push("/dashboard");
        return true;
      } else {
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          error: "اسم المستخدم أو كلمة المرور غير صحيحة",
        }));
        return false;
      }
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: "حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى.",
      }));
      return false;
    }
  };

  const logout = () => {
    setCookie("authToken", "", 0); // Delete cookie
    setAuthState({
      user: null,
      isLoading: false,
      error: null,
    });
    router.push("/login");
  };

  const clearError = () => {
    setAuthState(prev => ({ ...prev, error: null }));
  };

  return {
    user: authState.user,
    isLoading: authState.isLoading,
    error: authState.error,
    login,
    logout,
    clearError,
    isAuthenticated: !!authState.user,
  };
}

// Utility functions for cookie management
function setCookie(name: string, value: string, days: number) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

function getCookie(name: string): string | null {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}