<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class StockController extends Controller
{
    /**
     * Get sample stock data
     */
    public function index(): JsonResponse
    {
        $stocks = [
            [
                'symbol' => 'RELIANCE',
                'name' => 'Reliance Industries Ltd',
                'price' => 2456.78,
                'change' => 2.34,
                'change_percent' => 0.95,
                'volume' => 12500000,
                'market_cap' => 1800000000000,
            ],
            [
                'symbol' => 'TCS',
                'name' => 'Tata Consultancy Services',
                'price' => 3789.12,
                'change' => 1.87,
                'change_percent' => 0.49,
                'volume' => 8900000,
                'market_cap' => 1300000000000,
            ],
            [
                'symbol' => 'HDFC_BANK',
                'name' => 'HDFC Bank Ltd',
                'price' => 1567.34,
                'change' => -0.45,
                'change_percent' => -0.03,
                'volume' => 15200000,
                'market_cap' => 900000000000,
            ],
            [
                'symbol' => 'INFOSYS',
                'name' => 'Infosys Ltd',
                'price' => 1234.56,
                'change' => 0.92,
                'change_percent' => 0.75,
                'volume' => 10800000,
                'market_cap' => 600000000000,
            ],
        ];

        return response()->json([
            'success' => true,
            'data' => $stocks,
            'message' => 'Stock data retrieved successfully'
        ]);
    }

    /**
     * Get market overview
     */
    public function marketOverview(): JsonResponse
    {
        $overview = [
            'nifty_50' => [
                'value' => 22419.95,
                'change' => 0.85,
                'change_percent' => 0.38
            ],
            'sensex' => [
                'value' => 73852.94,
                'change' => 0.72,
                'change_percent' => 0.98
            ],
            'bank_nifty' => [
                'value' => 48123.45,
                'change' => -0.23,
                'change_percent' => -0.48
            ],
            'market_cap' => [
                'value' => 3456780000000000,
                'change' => 1.2,
                'change_percent' => 0.35
            ]
        ];

        return response()->json([
            'success' => true,
            'data' => $overview,
            'message' => 'Market overview retrieved successfully'
        ]);
    }

    /**
     * Health check endpoint
     */
    public function health(): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => 'Stock Market Analysis API is running',
            'timestamp' => now()->toISOString(),
            'version' => '1.0.0'
        ]);
    }
}
