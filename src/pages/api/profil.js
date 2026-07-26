import { pool } from '../../lib/db';

export async function POST({ request, locals }) {
    if (!locals.user) return new Response(JSON.stringify({ error: 'Akses ditolak' }), { status: 403 });
    
    try {
        const data = await request.formData();
        
        const updates = [
            data.get('nama_masjid'), data.get('alamat'), data.get('visi'), 
            data.get('misi'), data.get('sejarah'), data.get('telepon'), 
            data.get('email'), data.get('google_maps_link'),
            data.get('logo_url') || null, data.get('default_image_url') || null
        ];

        const [rows] = await pool.query('SELECT id FROM profil_masjid LIMIT 1');
        
        if (rows.length > 0) {
            await pool.query(
                `UPDATE profil_masjid SET nama_masjid = ?, alamat = ?, visi = ?, misi = ?, sejarah = ?, telepon = ?, email = ?, google_maps_link = ?, logo_url = ?, default_image_url = ? WHERE id = ?`,
                [...updates, rows[0].id]
            );
        } else {
            await pool.query(
                `INSERT INTO profil_masjid (nama_masjid, alamat, visi, misi, sejarah, telepon, email, google_maps_link, logo_url, default_image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                updates
            );
        }
        
        return new Response(JSON.stringify({ success: true }));
    } catch(e) {
        return new Response(JSON.stringify({ success: false, error: e.message }), { status: 500 });
    }
}
