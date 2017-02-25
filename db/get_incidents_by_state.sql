
select injuries.name as INJURY, causes.name as "Because", affected_areas.name as "area",
description, incidents.id as "incidents ID",
injury_Id, us_state from injuries

join incidents
on incidents.injury_id = injuries.id

join causes
on incidents.cause_id = causes.id

join affected_areas
on injuries.affected_area_id=affected_areas.id
where us_state =$1


-- db.get_incidents_by_state([state], function(err, incidents) {
--   res.send({
--     incidents: incidents
--   })
-- })

-- NB: [state is $1]
-- [state, var2, var3, var4]
-- var2 can be $2,
-- var3 can be $3,
-- var4 can be $4
