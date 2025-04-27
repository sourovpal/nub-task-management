<?php

use App\Models\Project;
use App\Models\Quotation;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;

Route::get('projects/{id}/print', function (Request $request) {
    $project = Project::find($request->id);
    $quotations = Quotation::where('project_id', $request->id)->get();
    // return view('quotation', compact('quotations', 'project'));
    $pdf = Pdf::loadView('quotation', compact('quotations', 'project'))->setPaper('a4', 'portrait');;
    return $pdf->stream('quotation.pdf');
});

Route::get('/{any}', function () {
    return view('index');
})->where('any', '.*');
