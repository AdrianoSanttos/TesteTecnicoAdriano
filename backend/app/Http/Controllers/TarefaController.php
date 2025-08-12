<?php

namespace App\Http\Controllers;

use App\Models\Tarefa;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class TarefaController extends Controller
{
    public function index()
    {
        return response()->json(Tarefa::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
        ]);
        $tarefa = Tarefa::create([
            'title' => $validated['title'],
            'completed' => false,
        ]);
        return response()->json($tarefa, Response::HTTP_CREATED);
    }

    public function destroy($id)
    {
        $tarefa = Tarefa::find($id);
        if (!$tarefa) {
            return response()->json(['error' => 'Tarefa não encontrada'], Response::HTTP_NOT_FOUND);
        }
        $tarefa->delete();
        return response()->json(['message' => 'Tarefa removida com sucesso']);
    }
}
