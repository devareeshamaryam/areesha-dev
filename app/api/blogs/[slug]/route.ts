import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

interface Params {
  params: { id: string };
}

export async function GET(_req: Request, { params }: Params) {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 404 });
  return NextResponse.json(data);
}

export async function DELETE(_req: Request, { params }: Params) {
  const { error } = await supabase
    .from("blogs")
    .delete()
    .eq("id", params.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ message: "Deleted successfully" });
}