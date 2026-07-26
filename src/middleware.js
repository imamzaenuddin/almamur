import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware((context, next) => {
    const { url, cookies, redirect } = context;
    const session = cookies.get('admin_session');
    
    // Parse session untuk semua request agar bisa dipakai di endpoint API
    if (session && session.value) {
        try {
            context.locals.user = JSON.parse(session.value);
        } catch (e) {
            cookies.delete('admin_session', { path: '/' });
        }
    }

    // Hanya proteksi route yang dimulai dengan /admin
    if (url.pathname.startsWith('/admin') && url.pathname !== '/admin/login') {
        if (!context.locals.user) {
            return redirect('/admin/login');
        }

        // Proteksi khusus untuk manajemen user (hanya admin)
        if (url.pathname.startsWith('/admin/users') && context.locals.user.role !== 'admin') {
            return redirect('/admin'); 
        }
    }

    // Lanjutkan request
    return next();
});
