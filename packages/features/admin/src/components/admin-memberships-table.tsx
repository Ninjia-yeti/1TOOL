'use client';

import Link from 'next/link';

import { ColumnDef } from '@tanstack/react-table';

import { Database } from '@kit/supabase/database';
import { DataTable } from '@kit/ui/enhanced-data-table';

type Membership =
  Database['public']['Tables']['accounts_memberships']['Row'] & {
    account: {
      id: string;
      name: string;
    };
  };

export function AdminMembershipsTable(props: { memberships: Membership[] }) {
  return <DataTable data={props.memberships} columns={getColumns()} />;
}

function getColumns(): ColumnDef<Membership>[] {
  return [
    {
      header: 'User ID',
      accessorKey: 'user_id',
    },
    {
      header: 'Team',
      cell: ({ row }) => {
        return (
          <Link
            className={'hover:underline'}
            href={`/admin/accounts/${row.original.account_id}`}
          >
            {row.original.account.name}
          </Link>
        );
      },
    },
    {
      header: 'Role',
      accessorKey: 'account_role',
    },
    {
      header: 'Created At',
      accessorKey: 'created_at',
    },
    {
      header: 'Updated At',
      accessorKey: 'updated_at',
    },
  ];
}
