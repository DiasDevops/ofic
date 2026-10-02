// Authentication and Admin Security for Jomano Centro Automotivo

const STORAGE_KEY_ADMIN_PASS = 'jomano_admin_pass_v1';
const STORAGE_KEY_ADMIN_AUTH = 'jomano_admin_authenticated';

// Initial default password (sent to administrator in the chat, not exposed in UI)
const DEFAULT_PASSWORD = 'Jomano@2026';

export const getStoredAdminPassword = (): string => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_ADMIN_PASS);
    if (saved && saved.trim().length > 0) {
      return saved;
    }
  } catch {
    // Fallback if localStorage is inaccessible
  }
  return DEFAULT_PASSWORD;
};

export const verifyAdminPassword = (inputPassword: string): boolean => {
  const currentPassword = getStoredAdminPassword();
  return inputPassword.trim() === currentPassword.trim();
};

export const changeAdminPassword = (
  currentPasswordInput: string,
  newPasswordInput: string
): { success: boolean; message: string } => {
  if (!verifyAdminPassword(currentPasswordInput)) {
    return {
      success: false,
      message: 'A senha atual informada está incorreta.',
    };
  }

  const trimmedNew = newPasswordInput.trim();
  if (trimmedNew.length < 4) {
    return {
      success: false,
      message: 'A nova senha deve ter no mínimo 4 caracteres.',
    };
  }

  try {
    localStorage.setItem(STORAGE_KEY_ADMIN_PASS, trimmedNew);
    return {
      success: true,
      message: 'Senha de administrador alterada com sucesso! Guarde sua nova credencial em local seguro.',
    };
  } catch (e) {
    return {
      success: false,
      message: 'Erro ao salvar a nova senha no navegador.',
    };
  }
};

export const isAdminAuthenticated = (): boolean => {
  try {
    return sessionStorage.getItem(STORAGE_KEY_ADMIN_AUTH) === 'true';
  } catch {
    return false;
  }
};

export const setAdminAuthenticated = (authenticated: boolean): void => {
  try {
    if (authenticated) {
      sessionStorage.setItem(STORAGE_KEY_ADMIN_AUTH, 'true');
    } else {
      sessionStorage.removeItem(STORAGE_KEY_ADMIN_AUTH);
      localStorage.removeItem('jomano_shop_mode');
    }
  } catch {}
};
