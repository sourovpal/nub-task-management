<?php

use App\Models\Quotation;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;

Route::get('projects/{id}/print', function (Request $request) {
    $quotations = Quotation::where('project_id', $request->id)->get();
    $pdf = Pdf::loadView('quotation', compact('quotations'))->setPaper('a4', 'portrait');;
    return $pdf->stream('quotation.pdf');
});

Route::get('/{any}', function () {
    return view('index');
})->where('any', '.*');
