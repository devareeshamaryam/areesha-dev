 import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

interface Params {
  params: Promise<{ slug: string }>; // ✅ Promise + slug (folder name ke mutabiq)
}

export async function GET(_req: Request, { params }: Params) {
  const { slug } = await params; // ✅ await karo

  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("id", slug)
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 404 });
  return NextResponse.json(data);
}

export async function DELETE(_req: Request, { params }: Params) {
  const { slug } = await params; // ✅ await karo

  const { error } = await supabase
    .from("blogs")
    .delete()
    .eq("id", slug);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ message: "Deleted successfully" });
}