<?php

namespace App\Http\Controllers;

use App\Models\Quotation;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Barryvdh\DomPDF\Facade\Pdf;

class QuotationController extends Controller
{
    public function index(Request $request)
    {
        $id = $request->project_id;

        $quotations = Quotation::when(
            $id,
            fn($query) => $query->where('project_id', $id),
            fn($query) => $query->whereNull('project_id')
        )->orderBy('id', 'DESC')
            ->get();

        return $quotations;
    }

    public function store(Request $request)
    {
        $attributes = ['project_id' => $request->project_id];

        $attributes['title'] = $request->title;
        $attributes['cost_amount'] = $request->cost_amount;

        Quotation::create($attributes);

        return response()->json([
            'message' => $request->project_id ? 'Quotation successfully added.' : 'Quotation created successfully.',
        ], Response::HTTP_CREATED);
    }

    public function update(Request $request)
    {
        $items = (array) $request->items;

        $attributes = [];

        foreach ($items as $item) {
            if (!isset($item['title'])) {
                continue;
            }

            $attributes['title'] = $item['title'];

            $attributes['quantity'] = (int) $item['quantity'];

            $attributes['cost_amount'] = (float) $item['cost_amount'];

            $attributes['total_cost'] = $attributes['quantity'] * $attributes['cost_amount'];

            Quotation::where('id', $item['id'])->update($attributes);
        }

        return response()->json([
            'message' => 'Quotation updated successfully.',
        ], Response::HTTP_CREATED);
    }

    public function delete(Request $request)
    {
        $id = $request->id;

        Quotation::where('id', $id)->delete();

        return response()->json([
            'message' => 'Quotation deleted successfully.',
        ], Response::HTTP_CREATED);
    }

    public function print(Request $request)
    {
        // $quotations = Quotation::where('project_id', $request->id)->get();
        // $pdf = Pdf::loadView('quotation', compact('quotations'))->setPaper('a4', 'portrait');;
        // return $pdf->stream('quotation.pdf');
    }
}
