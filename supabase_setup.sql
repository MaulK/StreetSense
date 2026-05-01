-- Run this in the Supabase SQL Editor to create the contacts table
CREATE TABLE IF NOT EXISTS contacts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow anonymous inserts on contacts" ON contacts FOR INSERT WITH CHECK (true);

-- Create the road_reports table for StreetSense Crowdsourcing
CREATE TABLE IF NOT EXISTS road_reports (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    road_name TEXT NOT NULL,
    description TEXT NOT NULL,
    severity TEXT NOT NULL CHECK (severity IN ('Low', 'Medium', 'High')),
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    weather_condition TEXT, -- For predictive analysis
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE road_reports ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (reporting a road)
CREATE POLICY "Allow anonymous inserts on road_reports" ON road_reports FOR INSERT WITH CHECK (true);

-- Allow anyone to read road reports (so other drivers can see them in real time)
CREATE POLICY "Allow public reads on road_reports" ON road_reports FOR SELECT USING (true);
