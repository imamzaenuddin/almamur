import { pool } from '../../../lib/db';

export async function POST({ request, cookies }) {
    try {
        const formData = await request.formData();
        const email = formData.get('email');
        const password = formData.get('password');
        
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        const user = rows[0];

        if (!user || user.password !== password) {
            return new Response(JSON.stringify({ success: false, error: 'Email atau password salah!' }), { status: 401 });
        }

        const sessionData = {
            id: user.id,
            nama: user.nama,
            role: user.role
        };
        
        cookies.set('admin_session', JSON.stringify(sessionData), {
            path: '/',
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7 // 7 hari
        });

        return new Response(JSON.stringify({ success: true }));
    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
    }
}
