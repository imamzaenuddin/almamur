import { pool } from '../../lib/db';

export async function POST({ request, locals }) {
    if (!locals.user) return new Response(JSON.stringify({ error: 'Akses ditolak' }), { status: 403 });
    
    try {
        const data = await request.formData();
        const id = data.get('id');
        
        if (id) {
            await pool.query(
                'UPDATE tiktok_videos SET judul = ?, url_video = ?, thumbnail = ?, views = ?, likes = ? WHERE id = ?',
                [data.get('judul'), data.get('url_video'), data.get('thumbnail') || null, data.get('views') || '0', data.get('likes') || '0', id]
            );
        } else {
            await pool.query(
                'INSERT INTO tiktok_videos (judul, url_video, thumbnail, views, likes) VALUES (?, ?, ?, ?, ?)',
                [data.get('judul'), data.get('url_video'), data.get('thumbnail') || null, data.get('views') || '0', data.get('likes') || '0']
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
        await pool.query('DELETE FROM tiktok_videos WHERE id = ?', [id]);
        return new Response(JSON.stringify({ success: true }));
    } catch(e) {
        return new Response(JSON.stringify({ success: false, error: e.message }), { status: 500 });
    }
}
