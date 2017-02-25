select injuries.name as INJURY, affected_areas.name as "area", description, incidents.id as "incidents ID", injury_Id, us_state from injuries
join incidents
on incidents.injury_id = injuries.id
join affected_areas
on injuries.affected_area_id=affected_areas.id
limit 30;
