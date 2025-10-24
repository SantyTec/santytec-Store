import React from 'react';
import { requestPasswordReset } from './actions';

export default function ForgotPasswordPage() {
  return (
    <div className="container px-4 py-8 md:px-6">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Recuperar contraseña</h1>
        <p className="text-sm text-muted-foreground mb-4">Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña.</p>

        <form action={requestPasswordReset} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input id="email" name="email" type="email" required className="mt-1 block w-full" />
          </div>

          <div>
            <button type="submit" className="btn-primary w-full">Enviar enlace</button>
          </div>
        </form>
      </div>
    </div>
  );
}
