import { pool } from '../../lib/db';

export async function POST({ request, locals }) {
    if (locals.user?.role !== 'admin') return new Response(JSON.stringify({ error: 'Akses ditolak' }), { status: 403 });
    
    try {
        const data = await request.formData();
        const id = data.get('id');
        const pwd = data.get('password');
        
        if (id) {
            if (pwd) {
                await pool.query(
                    'UPDATE users SET nama = ?, email = ?, password = ?, role = ? WHERE id = ?',
                    [data.get('nama'), data.get('email'), pwd, data.get('role'), id]
                );
            } else {
                await pool.query(
                    'UPDATE users SET nama = ?, email = ?, role = ? WHERE id = ?',
                    [data.get('nama'), data.get('email'), data.get('role'), id]
                );
            }
        } else {
            await pool.query(
                'INSERT INTO users (nama, email, password, role) VALUES (?, ?, ?, ?)',
                [data.get('nama'), data.get('email'), pwd, data.get('role')]
            );
        }
        return new Response(JSON.stringify({ success: true }));
    } catch(e) {
        return new Response(JSON.stringify({ success: false, error: e.message }), { status: 500 });
    }
}

export async function DELETE({ request, locals }) {
    if (locals.user?.role !== 'admin') return new Response(JSON.stringify({ error: 'Akses ditolak' }), { status: 403 });
    
    try {
        const url = new URL(request.url);
        const id = url.searchParams.get('id');
        
        // Cegah admin menghapus dirinya sendiri
        if (id == locals.user.id) {
            return new Response(JSON.stringify({ success: false, error: 'Tidak bisa menghapus akun sendiri' }), { status: 400 });
        }
        
        await pool.query('DELETE FROM users WHERE id = ?', [id]);
        return new Response(JSON.stringify({ success: true }));
    } catch(e) {
        return new Response(JSON.stringify({ success: false, error: e.message }), { status: 500 });
    }
}
