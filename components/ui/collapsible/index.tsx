"use client"
import { Collapsible as CollapsiblePrimitive } from "radix-ui";
import "./style.css";
import { cn } from "@/lib/utils";
import { useState } from "react";

function CollapsibleDemo() {
    return(
	<CollapsiblePrimitive.Root>
		<CollapsiblePrimitive.Trigger>…</CollapsiblePrimitive.Trigger>
		<CollapsiblePrimitive.Content className="CollapsibleContent">
			…
		</CollapsiblePrimitive.Content>
	</CollapsiblePrimitive.Root>
    )
}
function Collapsible({
    className,
    children,
    ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
    const [open, setOpen] = useState(true);
  return <CollapsiblePrimitive.Root 
    open={open}
	onOpenChange={setOpen}
    className={cn('CollapsibleRoot', className)}
    {...props}>
    {children}
  </CollapsiblePrimitive.Root>
}

function CollapsibleTrigger({
    children,
    ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Trigger>) {
  return <CollapsiblePrimitive.Trigger asChild {...props} >
    {children}
  </CollapsiblePrimitive.Trigger>
}

function CollapsibleContent({
    className,
    children,
    ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Content>) {
  return (
    <CollapsiblePrimitive.Content         
        className={cn('CollapsibleContent', className)}
        {...props} 
    >
        {children}
    </CollapsiblePrimitive.Content>
  )
}

export {Collapsible, CollapsibleTrigger, CollapsibleContent, CollapsibleDemo}
