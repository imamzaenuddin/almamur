import { pool } from '../../lib/db';

export async function POST({ request, locals }) {
    if (!locals.user) return new Response(JSON.stringify({ error: 'Akses ditolak' }), { status: 403 });
    
    try {
        const data = await request.formData();
        const id = data.get('id');
        
        if (id) {
            await pool.query(
                'UPDATE pengurus_dkm SET nama = ?, jabatan = ?, foto_url = ?, urutan = ? WHERE id = ?',
                [data.get('nama'), data.get('jabatan'), data.get('foto_url') || null, data.get('urutan') || 0, id]
            );
        } else {
            await pool.query(
                'INSERT INTO pengurus_dkm (nama, jabatan, foto_url, urutan) VALUES (?, ?, ?, ?)',
                [data.get('nama'), data.get('jabatan'), data.get('foto_url') || null, data.get('urutan') || 0]
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
        await pool.query('DELETE FROM pengurus_dkm WHERE id = ?', [id]);
        return new Response(JSON.stringify({ success: true }));
    } catch(e) {
        return new Response(JSON.stringify({ success: false, error: e.message }), { status: 500 });
    }
}
