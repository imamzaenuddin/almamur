import { pool } from '../../lib/db';

export async function POST({ request, locals }) {
    if (!locals.user) return new Response(JSON.stringify({ error: 'Akses ditolak' }), { status: 403 });
    
    try {
        const data = await request.formData();
        const id = data.get('id');
        
        if (id) {
            await pool.query(
                'UPDATE galeri SET judul = ?, gambar_url = ?, deskripsi = ? WHERE id = ?',
                [data.get('judul'), data.get('gambar_url'), data.get('deskripsi') || '', id]
            );
        } else {
            await pool.query(
                'INSERT INTO galeri (judul, gambar_url, deskripsi) VALUES (?, ?, ?)',
                [data.get('judul'), data.get('gambar_url'), data.get('deskripsi') || '']
            );
        }
        return new Response(JSON.stringify({ success: true }));
    } catch(e) {
        return new Response(JSON.stringify({ success: false, error: e.message }), { status: 500 });
    }
}

export async function DELETE({ request, locals }) {
    if (!locals.user) return new Response(JSON.stringify({ error: 'Akses ditolak' }), { status: 403 });
    
    try {
        const url = new URL(request.url);
        const id = url.searchParams.get('id');
        await pool.query('DELETE FROM galeri WHERE id = ?', [id]);
        return new Response(JSON.stringify({ success: true }));
    } catch(e) {
        return new Response(JSON.stringify({ success: false, error: e.message }), { status: 500 });
    }
}
