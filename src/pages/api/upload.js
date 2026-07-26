import fs from 'fs/promises';
import path from 'path';

export const prerender = false;

export async function POST({ request, locals }) {
    if (!locals.user) return new Response(JSON.stringify({ error: 'Akses ditolak' }), { status: 403 });

    try {
        const data = await request.formData();
        const file = data.get('file');

        if (!file || typeof file === 'string') {
            return new Response(JSON.stringify({ success: false, error: 'File tidak ditemukan' }), { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        
        // Buat ekstensi yang aman
        const filenameParts = file.name.split('.');
        const ext = filenameParts.length > 1 ? '.' + filenameParts.pop().toLowerCase() : '.jpg';
        const filename = `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
        
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        
        // Buat folder jika belum ada
        await fs.mkdir(uploadDir, { recursive: true });
        
        const filePath = path.join(uploadDir, filename);
        await fs.writeFile(filePath, buffer);

        return new Response(JSON.stringify({ success: true, url: `/uploads/${filename}` }));
    } catch (e) {
        return new Response(JSON.stringify({ success: false, error: e.message }), { status: 500 });
    }
}
