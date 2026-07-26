import { pool } from '../../lib/db';

export async function POST({ request, locals }) {
    try {
        const data = await request.formData();
        const judul = data.get('judul');
        
        if (!judul) {
            return new Response(JSON.stringify({ success: false, error: 'Judul harus diisi' }), { status: 400 });
        }

        let slug = data.get('slug') || judul.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        const id = data.get('id');
        const gambar_utama = data.get('gambar_utama') || null;

        if (id) {
            await pool.query(
                `UPDATE berita SET judul = ?, slug = ?, ringkasan = ?, isi_konten = ?, gambar_utama = ?, id_kategori = ?, status = ?, meta_title = ?, meta_description = ?, meta_keywords = ? WHERE id = ?`,
                [
                    data.get('judul'), slug, data.get('ringkasan') || '', data.get('isi_konten'), gambar_utama,
                    data.get('id_kategori') || 1, 'published',
                    data.get('meta_title'), data.get('meta_description'), data.get('meta_keywords'),
                    id
                ]
            );
        } else {
            const [result] = await pool.query(
                `INSERT INTO berita (judul, slug, ringkasan, isi_konten, gambar_utama, id_kategori, id_penulis, status, meta_title, meta_description, meta_keywords) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    data.get('judul'), slug, data.get('ringkasan') || '', data.get('isi_konten'), gambar_utama,
                    data.get('id_kategori') || 1, locals.user?.id || 1, 'published',
                    data.get('meta_title'), data.get('meta_description'), data.get('meta_keywords')
                ]
            );
            return new Response(JSON.stringify({ success: true, id: result.insertId }), { 
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        return new Response(JSON.stringify({ success: true }), { 
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

export async function DELETE({ request, locals }) {
    if (!locals.user) return new Response(JSON.stringify({ error: 'Akses ditolak' }), { status: 403 });
    
    try {
        const url = new URL(request.url);
        const id = url.searchParams.get('id');
        await pool.query('DELETE FROM berita WHERE id = ?', [id]);
        return new Response(JSON.stringify({ success: true }));
    } catch(e) {
        return new Response(JSON.stringify({ success: false, error: e.message }), { status: 500 });
    }
}
