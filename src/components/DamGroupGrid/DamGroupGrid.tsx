// src/components/DamGroupGrid/DamGroupGrid.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DamGroupGrid.scss';
import DamGaugeCard from '../DamGaugeCard/DamGaugeCard';
import {
  useGetAllDamGroupsQuery,
  useGetDamGroupMembersByNameQuery,
  useGetAllLatestDataQuery,
} from '../../services/damsApi';
import type { DamResource } from '../../types/types';

const DamGroupGrid: React.FC = () => {
  const navigate = useNavigate();

  // Fetch groups & latest data
  const { data: groups = [], isLoading: groupsLoading } = useGetAllDamGroupsQuery();
  const { data: latestAll = [], isLoading: latestLoading } = useGetAllLatestDataQuery();

  // Selected group (default to first when available)
  const [group, setGroup] = useState<string | undefined>(undefined);
  useEffect(() => {
    if (!group && groups.length > 0) setGroup(groups[0].group_name);
  }, [groups, group]);

  // Members for selected group
  const { data: members = [], isLoading: membersLoading } =
    useGetDamGroupMembersByNameQuery({ name: group ?? '' }, { skip: !group });

  // Build lookups & pick the eight to render
  const latestById = useMemo(() => {
    const m = new Map<string, DamResource>();
    for (const r of latestAll) m.set(r.dam_id, r);
    return m;
  }, [latestAll]);

  const eight = useMemo(() => {
    const ids = members.map((m) => m.dam_id);
    const rows = ids
      .map((id) => latestById.get(id))
      .filter(Boolean) as DamResource[];
    return rows.slice(0, 8);
  }, [members, latestById]);

  const anyLoading = groupsLoading || latestLoading || membersLoading;

  return (
    <section className="DamGroupGrid" aria-label="Dam group overview">
      <div className="DamGroupGrid__controls">
        <label htmlFor="dam-group" className="lbl">Dam group</label>
        <select
          id="dam-group"
          className="sel"
          value={group ?? ''}
          onChange={(e) => setGroup(e.target.value || undefined)}
          aria-label="Choose dam group"
        >
          {groups.map((g) => (
            <option key={g.group_name} value={g.group_name}>
              {g.group_name}
            </option>
          ))}
        </select>
      </div>

      {anyLoading && <div className="state">Loading group data…</div>}
      {!anyLoading && eight.length === 0 && (
        <div className="state">No dams found for this group.</div>
      )}

      <div className="DamGroupGrid__grid">
        {eight.map((r) => (
          <DamGaugeCard
            key={r.dam_id}
            name={r.dam_name ?? 'Unnamed Dam'}
            damId={r.dam_id}
            percentFull={r.percentage_full ?? null}
            onClick={(id) => navigate(`/dams/${encodeURIComponent(id)}`)}
          />
        ))}
      </div>
    </section>
  );
};

export default DamGroupGrid;
